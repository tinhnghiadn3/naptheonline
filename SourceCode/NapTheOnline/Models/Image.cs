using System;
using System.Collections.Generic;

namespace NapTheOnline.Models
{
    public class Image
    {
        public string id { get; set; }
        public string dirPath { get; set; }
        public Image(string id, string dirPath)
        {
            this.id = id;
            this.dirPath = dirPath;
        }
    }
    public class ImagePath
    {
        public string pathLogo { get; set; }
        public string pathBanner { get; set; }
        public List<string> pathDescription { get; set; }

        public ImagePath()
        {
            pathDescription = new List<string>();
        }
    }
}
