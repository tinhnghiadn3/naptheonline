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
            return await _context.Game.ToListAsync();
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
        public async Task<bool> PutGame([FromBody]Game game)
        {
            return true;
            //if (!GameExists(id))
            //{
            //    return Ok(new { Status = false, Msg = "Not found!!!" });
            //}
            //else
            //{
            //    Game game = FillGame(Request, id);
            //    _context.Entry(game).State = EntityState.Modified;

            //    try
            //    {
            //        await _context.SaveChangesAsync();
            //        return Ok(new { Status = true, Msg = "Success" });
            //    }
            //    catch (Exception ex)
            //    {
            //        return Ok(new { Status = false, Msg = ex.Message });
            //    }
            //}
        }

        [HttpPut("update/game")]
        public async Task<bool> UpdateGame([FromBody]Game input)
        {
            if (input.Id < 0 || input.Id == null)
            {
                return false;
            }

            var game = await _context.Game.FirstOrDefaultAsync(x => x.Id == input.Id);
            game.Name = input.Name;
            game.Logo = input.Logo;
            game.Banner = input.Banner;
            game.Prices = input.Prices;

            await _context.SaveChangesAsync();

            return true;
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
        public async Task<ActionResult> PostGame([FromBody]Game input)
        {
            Game game = FillGame(Request);
            //game.Banner = input.Banner;
            //game.Logo = input.Logo;
            _context.Game.Add(game);
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

        // DELETE: api/Games/5
        [HttpDelete]
        public async Task<ActionResult> DeleteGame([FromRoute]int id)
        {
            var game = await _context.Game.FindAsync(id);
            if (game == null)
            {
                return NotFound(new { Status = true, Msg = "Not found!!!" });
            }

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

        private Game FillGame(HttpRequest request, int? id = null)
        {
            Game game;
            if (id == null)
                game = new Game();
            else
                game = _context.Game.FirstOrDefault(x => x.Id == id);
            game.Name = request.Form["Name"].ToString();
            game.Description = request.Form["Description"].ToString();
            //game.Prices = request.Form["Prices"].ToString();
            game.Logo = request.Form["Logo"].ToString();
            game.Banner = request.Form["Banner"].ToString();
            return game;
        }
    }
}
