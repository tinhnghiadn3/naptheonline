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
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Game>>> GetGame()
        {
            var result = await _context.Game.ToListAsync();
            return result;
        }

        /// <summary>
        /// GET: api/Games/id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>All game by id</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Game>> GetGame(int id)
        {
            var game = await _context.Game.FindAsync(id);

            if (game == null)
            {
                return NotFound(new { status = "Empty" });
            }

            return game;
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
                FileUploads fileUploads = new FileUploads();
                if (!String.IsNullOrEmpty(input.Logo))
                {
                    fileUploads.DeleteImage(game.Logo);
                    game.Logo = input.Logo;
                }
                if (!String.IsNullOrEmpty(input.Banner))
                {
                    fileUploads.DeleteImage(game.Banner);
                    game.Banner = input.Banner;
                }

                game.Name = input.Name;
                game.Description = input.Description;
                //_context.Entry(game).State = EntityState.Modified;

                try
                {
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

                    return true;
                }
                catch (Exception ex)
                {
                    throw new ApplicationException(ex.Message);
                }
            }
        }

        [HttpPost("upload/images")]
        public ImagePathsModel UploadImages()
        {
            FileUploads fileUploads = new FileUploads();
            var result = new ImagePathsModel();

            foreach (var file in Request.Form.Files)
            {
                switch (file.Name)
                {
                    case "banner":
                        {
                            result.PathBanner = fileUploads.UploadImage(file, "Banner_");
                            break;
                        }
                    case "logo":
                        {
                            result.PathLogo = fileUploads.UploadImage(file, "Logo_");
                            break;
                        }
                    case "description":
                        {
                            result.PathDescription.Add(fileUploads.UploadImage(file, "Description_"));
                            break;
                        }
                    default: break;
                }
            }

            return result;
        }

        // POST: api/Games
        [HttpPost]
        public async Task<bool> Add([FromBody]Game input)
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
                    Logo = input.Logo,
                    Banner = input.Banner,
                    Description = input.Description,
                };

                //_context.Entry(game).State = EntityState.Modified;

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

                    return true;
                }
                catch (Exception ex)
                {
                    throw new ApplicationException(ex.Message);
                }
            }
        }

        // DELETE: api/Games/5
        [HttpDelete]
        public async Task<ActionResult> DeleteGame([FromRoute]int id)
        {
            var game = await _context.Game.FindAsync(id);
            if (game == null)
            {
                return NotFound(new { Status = true, Msg = "Not found!!!" });
            }
            FileUploads fileUploads = new FileUploads();
            fileUploads.DeleteImage(game.Logo);
            fileUploads.DeleteImage(game.Banner);
            _context.Game.Remove(game);
            try
            {
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
    }
}
