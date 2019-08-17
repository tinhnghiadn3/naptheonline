using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NapTheOnline.Helper;
using NapTheOnline.Models;

namespace NapTheOnline.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly NapTheOnline247Context _context;

        public NewsController(NapTheOnline247Context context)
        {
            _context = context;
        }

        // GET: api/News
        [HttpGet]
        public async Task<ActionResult<IEnumerable<News>>> GetNews()
        {
            return await _context.News.ToListAsync();
        }

        // GET: api/News/5
        [HttpGet("{id}")]
        public async Task<ActionResult<News>> GetNews(int id)
        {
            var news = await _context.News.FindAsync(id);

            if (news == null)
            {
                return NotFound(new { status = "Empty" });
            }

            return news;
        }

        // PUT: api/News/5
        [HttpPut]
        public async Task<IActionResult> PutNews(int id)
        {
            if (!NewsExists(id))
            {
                return Ok(new { Status = false, Msg = "Not found!!!" });
            }
            else
            {
                FileUploads fileUploads = new FileUploads();
                string pathLogo = null;
                foreach (var file in Request.Form.Files)
                {
                    switch (file.Name)
                    {
                        case "logo":
                            {
                                pathLogo = fileUploads.UploadImage(file, "Logo_");
                                break;
                            }
                        default: break;
                    }
                }


                News news = FillNews(Request, id);
                if (pathLogo != null)
                    news.Logo = pathLogo;
                _context.Entry(news).State = EntityState.Modified;

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

        // POST: api/News
        [HttpPost]
        public async Task<ActionResult<News>> PostNews()
        {
            FileUploads fileUploads = new FileUploads();
            string pathLogo = null;

            foreach (var file in Request.Form.Files)
            {
                switch (file.Name)
                {
                    case "logo":
                        {
                            pathLogo = fileUploads.UploadImage(file, "Logo_");
                            break;
                        }
                    default: break;
                }
            }

            News news = FillNews(Request);
            news.Logo = pathLogo;
            _context.News.Add(news);
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

        // DELETE: api/News/5
        [HttpDelete]
        public async Task<ActionResult<News>> DeleteNews(int id)
        {
            var news = await _context.News.FindAsync(id);
            if (news == null)
            {
                return NotFound(new { Status = true, Msg = "Not found!!!" });
            }

            _context.News.Remove(news);
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

        private bool NewsExists(int id)
        {
            return _context.News.Any(e => e.Id == id);
        }

        private News FillNews(HttpRequest request, int? id = null)
        {
            News news;
            if (id == null)
                news = new News();
            else
                news = _context.News.FirstOrDefault(x => x.Id == id);
            news.Name = request.Form["Name"].ToString();
            news.Description = request.Form["Description"].ToString();
            news.DateCreated = request.Form["DateCreated"].ToString();
            return news;
        }
    }
}
