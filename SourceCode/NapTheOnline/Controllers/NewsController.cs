﻿using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using NapTheOnline.Helper;
using NapTheOnline.Models;
using NapTheOnline.Services;
using NapTheOnline.ViewModels;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace NapTheOnline.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : BaseController
    {
        private readonly NewsService _newsService;

        public NewsController(IHostingEnvironment env, NewsService newsService) : base(env)
        {
            _newsService = newsService;
        }

        // GET: api/news
        [HttpGet("{typeId}/{pageIndex}")]
        public ListResultViewModel<List<NewsModel>> Get([FromRoute]int typeId, [FromRoute]int pageIndex) => _newsService.Get(typeId, pageIndex);

        //[Authorize]
        [HttpGet("{id:length(24)}")]
        public ActionResult<News> Get(string id)
        {
            var news = _newsService.Get(id);

            if (news == null)
            {
                return NotFound();
            }

            return news;
        }

        //[Authorize]
        [HttpGet("{friendlyname}")]
        public ActionResult<News> GetByFriendlyName([FromRoute]string friendlyname)
        {
            var news = _newsService.GetByFriendlyName(friendlyname);

            if (news == null)
            {
                return NotFound();
            }

            return news;
        }

        //[Authorize]
        [HttpPost]
        public JsonResult Create([FromBody]News news)
        {
            _newsService.Create(news);

            return new JsonResult(new { id = news.id });
        }

        //[Authorize]
        [HttpPut]
        public bool Update([FromBody]News newsIn)
        {
            var news = _newsService.Get(newsIn.id);

            if (news == null)
            {
                throw new ApplicationException("Not Found");
            }

            _newsService.Update(newsIn.id, newsIn);

            return true;
        }

        //[Authorize]
        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete([FromRoute]string id)
        {
            var news = _newsService.Get(id);

            if (news == null)
            {
                return NotFound();
            }
            FileUpload fileUpload = new FileUpload();
            fileUpload.DeleteImage(news.logo);
            if (news.images != null)
            {
                foreach (Image image in news.images)
                {
                    fileUpload.DeleteImage(image.dirPath);
                }
            }
            _newsService.Remove(news.id);

            return NoContent();
        }

        //[Authorize]
        [HttpPost("{id}/upload/images")]
        public bool UploadImages([FromRoute] string id)
        {
            var files = Request.Form.Files;
            if (files.Count > 0)
            {
                AddFolderStoringImage();

                var news = _newsService.Get(id);
                if (news != null)
                {
                    FileUpload fileUpload = new FileUpload();
                    var result = new ImagePath();
                    List<Image> listImage = new List<Image>();
                    Image image;
                    foreach (var file in files)
                    {
                        if (file.Name == "logo")
                        {
                            result.pathLogo = fileUpload.UploadImage(file, "Logo_");
                            fileUpload.DeleteImage(news.logo);
                        }

                        if (file.Name.Contains("description"))
                        {
                            var pathDesc = fileUpload.UploadImage(file, "Description_");
                            result.pathDescription.Add(pathDesc);
                            image = new Image(Guid.NewGuid().ToString(), pathDesc);
                            listImage.Add(image);
                        }
                    }
                    news.images = listImage;
                    if (!string.IsNullOrEmpty(result.pathLogo))
                    {
                        news.logo = result.pathLogo;
                    }

                    for (int i = 0; i < result.pathDescription.Count; i++)
                    {
                        news.description = news.description.Replace("{" + i + "}", result.pathDescription[i]);
                    }
                    _newsService.Update(id, news);
                }
            }
            return true;
        }
    }
}