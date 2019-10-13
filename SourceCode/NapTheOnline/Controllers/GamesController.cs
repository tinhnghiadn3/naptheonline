using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
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
        public ActionResult<List<Game>> Get(int pageIndex) => _gameService.GetGame(pageIndex);

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
        public ActionResult<Game> Create(Game game)
        {
            _gameService.Create(game);

            return CreatedAtRoute("GetGame", new { id = game.Id.ToString() }, game);
        }

        // PUT api/games/5
        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Game gameIn)
        {
            var game = _gameService.Get(id);

            if (game == null)
            {
                return NotFound();
            }

            _gameService.Update(id, gameIn);

            return NoContent();
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

            _gameService.Remove(game.Id);

            return NoContent();
        }
    }
}