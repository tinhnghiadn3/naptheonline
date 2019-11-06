using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NapTheOnline.Models
{
    public class CardChargeResponseViewModel
    {
        public int code { get; set; }
        public string amount { get; set; }
        public string msg { get; set; }
        public string trans_id { get; set; }
    }
}
