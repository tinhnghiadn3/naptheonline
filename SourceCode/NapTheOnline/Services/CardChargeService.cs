using NapTheOnline.Models;
using System;
using System.Net;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using NLog;
using NapTheOnline.ViewModels;

namespace NapTheOnline.Services
{
    public class CardChargeService
    {
        private readonly IMongoCollection<Transaction> _transaction;
        private const string secretkey = "3eb4ecf5cc106b9e4c5afd733f7b8cfe";
        private const string merchantId = "4155";
        private const string apiMail = "danh.nguyen.6620@gmail.com";
        private static Logger _logger = LogManager.GetCurrentClassLogger();

        public CardChargeService(IOptions<AppSettings> appSettings, IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.Database);
            _transaction = database.GetCollection<Transaction>("Transaction");
        }

        public async Task<CardChargeResponseViewModel> Charge(ChargeInfoViewModel param)
        {
            try
            {
                string urlWS = "http://api.napthengay.com/v2/";

                var transId = GenerateTransId();
                //Dia chi mail dang ky tai khoan tren napthengay.com
                var plaintText = string.Format("{0}{1}{2}{3}{4}{5}{6}{7}{8}", merchantId, apiMail, transId, param.CardId, param.CardValue, param.PinField, param.SeriField, "md5", secretkey);
                string key = GetMD5Hash(plaintText);

                var respone = string.Empty;
                using (WebClient client = new WebClient())
                {
                    string url = string.Format("{0}?merchan_id={1}&card_id={2}&seri_field={3}&pin_field={4}&trans_id={5}&data_sign={6}&algo_mode=md5&api_email={7}&card_value={8}", urlWS, merchantId, param.CardId, param.SeriField, param.PinField, transId, key, apiMail, param.CardValue);
                    respone = await client.DownloadStringTaskAsync(url);
                }
                
                var result = JsonConvert.DeserializeObject<CardChargeResponseViewModel>(respone);
                StoreTransaction(param, result);
                // remove transId before respone FE
                result.trans_id = string.Empty;
                return result;
            }
            catch (Exception ex)
            {
                _logger.LogException(LogLevel.Error, DateTime.Now.ToString(), ex);
                return new CardChargeResponseViewModel();
            }
        }

        private static string GetMD5Hash(string input)
        {
            System.Security.Cryptography.MD5CryptoServiceProvider x = new System.Security.Cryptography.MD5CryptoServiceProvider();
            byte[] bs = System.Text.Encoding.UTF8.GetBytes(input);
            bs = x.ComputeHash(bs);
            System.Text.StringBuilder s = new System.Text.StringBuilder();
            foreach (byte b in bs)
            {
                s.Append(b.ToString("x2").ToLower());
            }
            string password = s.ToString();
            return password;
        }

        private string GenerateTransId()
        {
            var rand = new Random();
            return string.Format("{0}_{1}", DateTime.Now.ToString("yyyyMMddHHmmssfff"), rand.Next(1000, 9999));
        }

        private void StoreTransaction(ChargeInfoViewModel param, CardChargeResponseViewModel respone)
        {
            var transaction = new Transaction(respone.code, respone.amount, param.CardId, param.CardValue, param.PinField, param.SeriField, respone.trans_id, respone.msg);
            _transaction.InsertOne(transaction);
        }
    }
}
