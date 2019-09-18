using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NapTheOnline.Models;
using NapTheOnline.Helper;
using NapTheOnline.ViewModels;

namespace NapTheOnline.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GamesController : ControllerBase
    {
        private readonly NapTheOnline247Context _context;

        public GamesController(NapTheOnline247Context context)
        {
            _context = context;
        }

        /// <summary>
        /// GET: api/Games
        /// </summary>
        /// <returns>All game</returns>
        [HttpGet("{pageIndex}")]
        public async Task<List<Game>> GetGames([FromRoute]int pageIndex)
        {
            try
            {
                var allGames = await _context.Game.ToListAsync();
                if (pageIndex == 0)
                    return allGames;

                var take = 5;
                var skip = (pageIndex - 1) * take;
                return allGames.Skip(skip).Take(take).ToList();
            }
            catch (Exception ex)
            {
                throw new ApplicationException(ex.Message);
            }
        }

        /// <summary>
        /// Get prices of game
        /// </summary>
        [HttpGet("{gameId}")]
        public async Task<List<PriceModel>> GetPricesGame(int gameId)
        {
            try
            {
                var prices = await _context.Prices.Where(_ => _.GameId == gameId).ToListAsync();
                var result = new List<PriceModel>();

                prices.ForEach(item =>
                {
                    var price = new PriceModel
                    {
                        Name = item.Name,
                        Value = Convert.ToDouble(item.Value)
                    };

                    result.Add(price);
                });

                return result;
            }
            catch (Exception ex)
            {
                throw new ApplicationException(ex.Message);
            }
        }

        /// <summary>
        /// PUT: api/Games/5
        /// Update
        /// </summary>
        /// <param name="game"></param>
        /// <returns></returns>
        [HttpPut]
        public async Task<bool> Update([FromBody]Game input)
        {

            if (!GameExists(input.Id))
            {
                throw new ApplicationException("Not Found");
            }
            else
            {
                var game = await _context.Game.FindAsync(input.Id);
                game.Name = input.Name;
                game.Description = input.Description;

                try
                {
                    await _context.SaveChangesAsync();
                    //
                    // Update prices
                    if (input.Prices.Count > 0)
                    {
                        var prices = _context.Prices.Where(_ => _.GameId == game.Id).ToList();
                        if (prices.Count > 0 && prices != input.Prices)
                        {
                            _context.Prices.RemoveRange(prices);
                            await _context.SaveChangesAsync();
                        }

                        foreach (var item in input.Prices)
                        {
                            var price = new Prices
                            {
                                Name = item.Name,
                                Value = item.Value,
                                GameId = game.Id
                            };

                            await _context.Prices.AddAsync(price);
                            await _context.SaveChangesAsync();
                        }
                    }

                    return true;
                }
                catch (Exception ex)
                {
                    throw new ApplicationException(ex.Message);
                }
            }
        }

        [HttpPost("{id}/upload/images")]
        public async Task<bool> UploadImagesAsync([FromRoute]int id)
        {
            var files = Request.Form.Files;
            if (files.Count > 0)
            {
                var game = await _context.Game.FindAsync(id);
                if (game == null)
                {
                    throw new ApplicationException("Game is not existed");
                }

                var imageGames = await _context.ImageGame.Where(_ => _.GameId == id).ToListAsync();

                FileUploads fileUploads = new FileUploads();
                var result = new ImagePathsModel();

                foreach (var file in files)
                {
                    switch (file.Name)
                    {
                        case "banner":
                            {
                                result.PathBanner = fileUploads.UploadImage(file, "Banner_");

                                await DeleteOldPathImage(imageGames, file.Name, fileUploads);

                                await AddGameImage(file.Name, result.PathBanner, id);

                                break;
                            }
                        case "logo":
                            {
                                result.PathLogo = fileUploads.UploadImage(file, "Logo_");

                                await DeleteOldPathImage(imageGames, file.Name, fileUploads);

                                await AddGameImage(file.Name, result.PathLogo, id);

                                break;
                            }
                        default: break;
                    }

                    if (file.Name.Contains("description"))
                    {
                        var pathDesc = fileUploads.UploadImage(file, "Description_");
                        result.PathDescription.Add(pathDesc);

                        await DeleteOldPathImage(imageGames, file.Name, fileUploads);

                        await AddGameImage(file.Name, pathDesc, id);
                    }
                }

                if (!string.IsNullOrEmpty(result.PathBanner))
                {
                    game.Banner = result.PathBanner;
                }

                if (!string.IsNullOrEmpty(result.PathLogo))
                {
                    game.Logo = result.PathLogo;
                }

                for (int i = 0; i < result.PathDescription.Count; i++)
                {
                    game.Description = game.Description.Replace("{" + i + "}", "<img src=" + result.PathDescription[i] + " />");
                }

                await _context.SaveChangesAsync();
            }

            return true;
        }

        // POST: api/Games
        [HttpPost]
        public async Task<int> Add([FromBody]Game input)
        {
            if (GameExists(input.Id))
            {
                throw new ApplicationException("This game is existed");
            }
            else
            {
                var game = new Game
                {
                    Name = input.Name,
                    Logo = string.Empty,
                    Banner = string.Empty,
                    Description = input.Description,
                };

                try
                {
                    await _context.Game.AddAsync(game);
                    await _context.SaveChangesAsync();

                    if (input.Prices.Count > 0)
                    {
                        var prices = _context.Prices.Where(_ => _.GameId == game.Id).ToList();
                        if (prices.Count > 0 && prices != input.Prices)
                        {
                            _context.Prices.RemoveRange(prices);
                            await _context.SaveChangesAsync();
                        }

                        foreach (var item in input.Prices)
                        {
                            var price = new Prices
                            {
                                Name = item.Name,
                                Value = item.Value,
                                GameId = game.Id
                            };

                            await _context.Prices.AddAsync(price);
                            await _context.SaveChangesAsync();
                        }
                    }

                    return game.Id;
                }
                catch (Exception ex)
                {
                    throw new ApplicationException(ex.Message);
                }
            }
        }

        // DELETE: api/Games/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteGame([FromRoute]int id)
        {
            try
            {
                var game = await _context.Game.FindAsync(id);
                if (game == null)
                {
                    return NotFound(new { Status = true, Msg = "Not found!!!" });
                }

                //
                // Prices
                var prices = _context.Prices.Where(_ => _.GameId == game.Id).ToList();
                if (prices.Count > 0)
                {
                    _context.Prices.RemoveRange(prices);
                    await _context.SaveChangesAsync();
                }

                var imagePaths = _context.ImageGame.Where(_ => _.GameId == game.Id).ToList();
                if (imagePaths.Count > 0)
                {
                    _context.ImageGame.RemoveRange(imagePaths);
                    await _context.SaveChangesAsync();

                    FileUploads fileUploads = new FileUploads();
                    imagePaths.ForEach(path =>
                    {
                        fileUploads.DeleteImage(path.DirPath);
                    });
                }

                _context.Game.Remove(game);
                await _context.SaveChangesAsync();
                return Ok(new { Status = true, Msg = "Success" });
            }
            catch (Exception ex)
            {
                return Ok(new { Status = false, Msg = ex.Message });
            }
        }

        private bool GameExists(int id)
        {
            return _context.Game.Any(e => e.Id == id);
        }

        private async Task AddGameImage(string name, string path, int gameId)
        {
            var logoPath = new ImageGame
            {
                Name = name,
                DirPath = path,
                GameId = gameId
            };

            await _context.ImageGame.AddAsync(logoPath);
            await _context.SaveChangesAsync();
        }

        private async Task DeleteOldPathImage(List<ImageGame> imagePaths, string fileName, FileUploads fileUploads)
        {
            //
            // delete old path
            if (imagePaths.Count > 0)
            {
                var descPath = imagePaths.Where(_ => _.Name == fileName).FirstOrDefault();
                if (descPath != null && !string.IsNullOrEmpty(descPath.DirPath))
                {
                    fileUploads.DeleteImage(descPath.DirPath);
                }

                _context.ImageGame.Remove(descPath);
                await _context.SaveChangesAsync();
            }
        }
    }
}
