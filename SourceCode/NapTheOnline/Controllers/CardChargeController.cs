using Microsoft.AspNetCore.Mvc;
using NapTheOnline.Models;
using NapTheOnline.Services;
using System.Threading.Tasks;

namespace NapTheOnline.Controllers
{
    [Route("api/[controller]")]
    public class CardChargeController
    {
        private CardChargeService _cardChargeService;
        public CardChargeController(CardChargeService cardChargeService)
        {
            _cardChargeService = cardChargeService;
        }

        [HttpPost("charge")]
        public async Task<CardChargeResponseViewModel> ChargeAsync([FromBody]ChargeInfoViewModel param)
        {
            return await _cardChargeService.Charge(param);
        }
    }
}
