using System;
using System.Collections.Generic;

namespace NapTheOnline.Models
{
    public partial class ImageNews
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string DirPath { get; set; }
        public int? NewsId { get; set; }

        public virtual News News { get; set; }
    }
}
