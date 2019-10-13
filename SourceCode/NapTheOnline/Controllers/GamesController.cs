using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NapTheOnline.Helper;
using NapTheOnline.Models;
using NapTheOnline.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace NapTheOnline.Controllers
{
    [Route("api/[controller]")]
    public class GamesController : Controller
    {
        private readonly GameService _gameService;
        public GamesController(GameService gameService)
        {
            _gameService = gameService;
        }
        // GET: api/games
        [HttpGet("page/{pageIndex}")]
        public ListResult<List<Game>> Get([FromRoute]int pageIndex) => _gameService.GetGame(pageIndex);

        // GET api/games/5
        [HttpGet("{id:length(24)}", Name = "GetGame")]
        public ActionResult<Game> Get(string id)
        {
            var game = _gameService.Get(id);

            if (game == null)
            {
                return NotFound();
            }

            return game;
        }

        // POST api/games
        [HttpPost]
        public JsonResult Create([FromBody]Game game)
        {
            _gameService.Create(game);

            return new JsonResult(new { id = game.id });
        }

        // PUT api/games/5
        [HttpPut]
        public bool Update([FromBody]Game gameIn)
        {
            var game = _gameService.Get(gameIn.id);

            if (game == null)
            {
                throw new ApplicationException("Not Found");
            }

            _gameService.Update(gameIn.id, gameIn);

            return true;
        }

        // DELETE api/games/5
        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete([FromRoute]string id)
        {
            var game = _gameService.Get(id);

            if (game == null)
            {
                return NotFound();
            }
            FileUpload fileUpload = new FileUpload();
            fileUpload.DeleteImage(game.logo);
            fileUpload.DeleteImage(game.banner);
            if (game.images != null)
            {
                foreach (Image image in game.images)
                {
                    fileUpload.DeleteImage(image.dirPath);
                }
            }

            _gameService.Remove(game.id);

            return Ok();
        }
        [HttpPost("{id}/upload/images")]
        public bool UploadImages([FromRoute] string id)
        {
            var files = Request.Form.Files;
            if (files.Count > 0)
            {
                var game = _gameService.Get(id);
                if (game != null)
                {
                    FileUpload fileUpload = new FileUpload();
                    var result = new ImagePath();
                    List<Image> listImage = new List<Image>();
                    Image image;
                    foreach (var file in files)
                    {
                        switch (file.Name)
                        {
                            case "banner":
                                {
                                    result.pathBanner = fileUpload.UploadImage(file, "Banner_");
                                    fileUpload.DeleteImage(game.banner);
                                    break;
                                }
                            case "logo":
                                {
                                    result.pathLogo = fileUpload.UploadImage(file, "Logo_");
                                    fileUpload.DeleteImage(game.logo);
                                    break;
                                }
                            default: break;
                        }
                        
                        if (file.Name.Contains("description"))
                        {
                            var pathDesc = fileUpload.UploadImage(file, "Description_");
                            result.pathDescription.Add(pathDesc);
                            image = new Image(Guid.NewGuid().ToString(), pathDesc);
                            listImage.Add(image);
                        }
                    }
                    game.images = listImage;
                    if (!string.IsNullOrEmpty(result.pathBanner))
                    {
                        game.banner = result.pathBanner;
                    }

                    if (!string.IsNullOrEmpty(result.pathLogo))
                    {
                        game.logo = result.pathLogo;
                    }

                    for (int i = 0; i < result.pathDescription.Count; i++)
                    {
                        game.description = game.description.Replace("{" + i + "}", "<img src=" + result.pathDescription[i] + " />");
                    }
                    _gameService.Update(id, game);
                }
            }
            return true;
        }
    }
}