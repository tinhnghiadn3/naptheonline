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
        /// <param name="id"></param>
        /// <param name="game"></param>
        /// <returns></returns>
        [HttpPut]
        public async Task<IActionResult> PutGame(int id)
        {
            if (!GameExists(id))
            {
                return Ok(new { Status = false, Msg = "Not found!!!" });
            }
            else
            {
                FileUploads fileUploads = new FileUploads();
                string pathBanner = null, pathLogo = null;
                foreach (var file in Request.Form.Files)
                {
                    switch (file.Name)
                    {
                        case "banner":
                            {
                                pathBanner = fileUploads.UploadImage(file, "Banner_");
                                break;
                            }
                        case "logo":
                            {
                                pathLogo = fileUploads.UploadImage(file, "Logo_");
                                break;
                            }
                        default: break;
                    }
                }


                Game game = FillGame(Request, id);
                if (pathBanner != null)
                {
                    fileUploads.DeleteImage(game.Banner);
                    game.Banner = pathBanner;
                }
                   
                if (pathLogo != null)
                {
                    fileUploads.DeleteImage(game.Logo);
                    game.Logo = pathLogo;
                }
                _context.Entry(game).State = EntityState.Modified;

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
        }

        // POST: api/Games
        [HttpPost]
        public async Task<ActionResult> PostGame()
        {
            FileUploads fileUploads = new FileUploads();
            string pathBanner = null, pathLogo = null;
            
            foreach (var file in Request.Form.Files)
            {
                switch (file.Name)
                {
                    case "banner":
                        {
                            pathBanner = fileUploads.UploadImage(file, "Banner_");
                            break;
                        }
                    case "logo":
                        {
                            pathLogo = fileUploads.UploadImage(file, "Logo_");
                            break;
                        }
                    default: break;
                }
            }

            Game game = FillGame(Request);
            game.Banner = pathBanner;
            game.Logo = pathLogo;
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
        public async Task<ActionResult> DeleteGame(int id)
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

        private Game FillGame(HttpRequest request, int? id = null)
        {
            Game game;
            if (id == null)
                game = new Game();
            else
                game = _context.Game.FirstOrDefault(x => x.Id == id);
            game.Name = request.Form["Name"].ToString();
            game.Description = request.Form["Description"].ToString();
            game.Prices = request.Form["Prices"].ToString();
            return game;
        }
    }
}
