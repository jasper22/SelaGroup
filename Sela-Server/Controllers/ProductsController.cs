using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sela_Server.Core;

namespace Sela_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private IitemsFactory productFactory;

        public ProductsController(IitemsFactory itemsFactory)
        {
            this.productFactory = itemsFactory;
        }


        // GET: api/Products/5
        [HttpGet("{offset}/{word?}")]
        public async Task<ActionResult<IEnumerable<IProduct>>> Get(int offset, string word)
        {
            try
            {
                var result = await this.productFactory.GetProducts(offset, word ?? string.Empty);
                return Ok(result);
            }
            catch(ApplicationException expApp)
            {
                return BadRequest(expApp);
            }
        }
    }
}
