using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NapTheOnline.Models
{
    public class Transaction
    {
        public int code { get; set; }
        private string amount { get; set; }
        public string transId { get; set; }
        public int cardId { get; set; }
        public int cardValue { get; set; }
        public string pinField { get; set; }
        public string seriField { get; set; }
        public string message { get; set; }

        public Transaction(int code, string amount, int cardId, int cardValue, string pinField, string seriField, string transId, string message)
        {
            this.code = code;
            this.amount = amount;
            this.cardId = cardId;
            this.cardValue = cardValue;
            this.pinField = pinField;
            this.seriField = seriField;
            this.transId = transId;
            this.message = message;
        }
    }
}
