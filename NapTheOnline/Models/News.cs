﻿using System;
using System.Collections.Generic;

namespace NapTheOnline.Models
{
    public partial class News
    {
        public int Id { get; set; }
        public string Logo { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string DateCreated { get; set; }
    }
}
