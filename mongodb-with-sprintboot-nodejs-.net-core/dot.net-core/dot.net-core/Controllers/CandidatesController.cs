using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dot.net_core.Models;
using dot.net_core.Services;
using Microsoft.AspNetCore.Mvc;

namespace dot.net_core.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class CandidatesController : ControllerBase
    {
        private readonly CandidatesService candidatesService;

        public CandidatesController(CandidatesService candidatesService)
        {
            this.candidatesService = candidatesService;
        }
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Candidate>>> Get()
        {
            return await candidatesService.GetAll().ConfigureAwait(false);
        }
    }
}
