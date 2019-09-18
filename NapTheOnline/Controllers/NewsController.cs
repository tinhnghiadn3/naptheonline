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
        [HttpGet("{pageIndex}")]
        public async Task<List<News>> GetNews([FromRoute]int pageIndex)
        {
            try
            {
                var allNews = await _context.News.ToListAsync();
                if (pageIndex == 0)
                return allNews;

                var take = 5;
                var skip = (pageIndex -1) * 5;
                return allNews.Skip(skip).Take(take).ToList();
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

        [HttpPost("{id}/upload/images")]
        public async Task<bool> UploadImagesAsync([FromRoute]int id)
        {
            try
            {
                var files = Request.Form.Files;
                if (files.Count > 0)
                {
                    var news = await _context.News.FindAsync(id);
                    if (news == null)
                    {
                        throw new ApplicationException("News is not existed");
                    }

                    var imageNews = await _context.ImageNews.Where(_ => _.NewsId == id).ToListAsync();

                    FileUploads fileUploads = new FileUploads();
                    var result = new ImagePathsModel();

                    foreach (var file in Request.Form.Files)
                    {
                        if (file.Name == "logo")
                        {
                            result.PathLogo = fileUploads.UploadImage(file, "Logo_");

                            await DeleteOldPathImage(imageNews, file.Name, fileUploads);

                            await AddNewsImage(file.Name, result.PathLogo, id);
                        }

                        if (file.Name.Contains("description"))
                        {
                            var pathDesc = fileUploads.UploadImage(file, "Description_");
                            result.PathDescription.Add(pathDesc);

                            await DeleteOldPathImage(imageNews, file.Name, fileUploads);

                            await AddNewsImage(file.Name, pathDesc, id);
                        }
                    }

                    if (!string.IsNullOrEmpty(result.PathLogo))
                    {
                        news.Logo = result.PathLogo;
                    }

                    for (int i = 0; i < result.PathDescription.Count; i++)
                    {
                        news.Description = news.Description.Replace("{" + i + "}", "<img src=" + result.PathDescription[i] + " />");
                    }

                    await _context.SaveChangesAsync();
                }

                return true;
            }
            catch (Exception ex)
            {

                throw new ApplicationException(ex.Message);
            }
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
                try
                {
                    var news = new News
                    {
                        Name = input.Name,
                        Logo = string.Empty,
                        Description = input.Description,
                        DateCreated = input.DateCreated
                    };

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
            try
            {
                var news = await _context.News.FindAsync(id);
                if (news == null)
                {
                    return NotFound(new { Status = true, Msg = "Not found!!!" });
                }

                var imagePaths = _context.ImageNews.Where(_ => _.NewsId == news.Id).ToList();
                if (imagePaths.Count > 0)
                {
                    _context.ImageNews.RemoveRange(imagePaths);
                    await _context.SaveChangesAsync();

                    FileUploads fileUploads = new FileUploads();
                    imagePaths.ForEach(path =>
                    {
                        fileUploads.DeleteImage(path.DirPath);
                    });
                }

                _context.News.Remove(news);
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

        private async Task AddNewsImage(string name, string path, int newsId)
        {
            var logoPath = new ImageNews
            {
                Name = name,
                DirPath = path,
                NewsId = newsId
            };

            await _context.ImageNews.AddAsync(logoPath);
            await _context.SaveChangesAsync();
        }

        private async Task DeleteOldPathImage(List<ImageNews> imageNews, string fileName, FileUploads fileUploads)
        {
            //
            // delete old path
            if (imageNews.Count > 0)
            {
                var descPath = imageNews.Where(_ => _.Name == fileName).FirstOrDefault();
                if (descPath != null && !string.IsNullOrEmpty(descPath.DirPath))
                {
                    fileUploads.DeleteImage(descPath.DirPath);
                }

                _context.ImageNews.Remove(descPath);
                await _context.SaveChangesAsync();
            }
        }
    }
}
