using Microsoft.AspNetCore.Mvc;
using NapTheOnline.Services;
using NapTheOnline.ViewModels;
using System.Threading.Tasks;

namespace NapTheOnline.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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
