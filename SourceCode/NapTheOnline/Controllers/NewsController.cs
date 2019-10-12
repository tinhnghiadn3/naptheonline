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
    public class NewsController : Controller
    {
        private readonly NewsService _newsService;
        public NewsController(NewsService newsService)
        {
            _newsService = newsService;
        }
        // GET: api/news
        [HttpGet]
        public ActionResult<List<News>> Get() => _newsService.Get();

        // GET api/news/5
        [HttpGet("{id:length(24)}", Name = "GetNews")]
        public ActionResult<News> Get(string id)
        {
            var news = _newsService.Get(id);

            if (news == null)
            {
                return NotFound();
            }

            return news;
        }

        // POST api/news
        [HttpPost]
        public ActionResult<News> Create(News news)
        {
            _newsService.Create(news);

            return CreatedAtRoute("GetNews", new { id = news.Id.ToString() }, news);
        }

        // PUT api/news/5
        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, News newsIn)
        {
            var news = _newsService.Get(id);

            if (news == null)
            {
                return NotFound();
            }

            _newsService.Update(id, newsIn);

            return NoContent();
        }

        // DELETE api/news/5
        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete([FromRoute]string id)
        {
            var news = _newsService.Get(id);

            if (news == null)
            {
                return NotFound();
            }

            _newsService.Remove(news.Id);

            return NoContent();
        }
    }
}