using System;
using System.Collections.Generic;

namespace NapTheOnline.Models
{
    public class Image
    {
        public string id { get; set; }
        public string dirPath { get; set; }
    }
    public class ImagePath
    {
        public string pathLogo { get; set; }
        public string pathbanner { get; set; }
        public List<string> pathDescription { get; set; }

        public ImagePath()
        {
            pathDescription = new List<string>();
        }
    }
}
