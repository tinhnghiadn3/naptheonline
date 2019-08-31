using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NapTheOnline.Helper;
using NapTheOnline.Models;
using NapTheOnline.ViewModels;

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
        public async Task<IList<News>> GetNews()
        {
            try
            {
                return await _context.News.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new ApplicationException(ex.Message);
            }
        }

        // PUT: api/News/5
        [HttpPut]
        public async Task<bool> Update([FromBody]News input)
        {
            if (!NewsExists(input.Id))
            {
                throw new ApplicationException("Not Found");
            }
            else
            {
                var news = await _context.News.FindAsync(input.Id);
                FileUploads fileUploads = new FileUploads();
                if (!String.IsNullOrEmpty(input.Logo))
                {
                    fileUploads.DeleteImage(news.Logo);
                    news.Logo = input.Logo;
                }

                news.Name = input.Name;
                news.Description = input.Description;
                news.DateCreated = input.DateCreated;

                try
                {
                    await _context.SaveChangesAsync();
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

        // POST: api/News
        [HttpPost]
        public async Task<int> Add([FromBody]News input)
        {
            if (NewsExists(input.Id))
            {
                throw new ApplicationException("This news is existed");
            }
            else
            {
                var news = new News
                {
                    Name = input.Name,
                    Description = input.Description,
                    DateCreated = input.DateCreated
                };

                try
                {
                    await _context.News.AddAsync(news);
                    await _context.SaveChangesAsync();

                    return news.Id;
                }
                catch (Exception ex)
                {
                    throw new ApplicationException(ex.Message);
                }
            }
        }

        // DELETE: api/News/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteNews([FromRoute]int id)
        {
            var news = await _context.News.FindAsync(id);
            if (news == null)
            {
                return NotFound(new { Status = true, Msg = "Not found!!!" });
            }

            FileUploads fileUploads = new FileUploads();
            fileUploads.DeleteImage(news.Logo);

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
    }
}
