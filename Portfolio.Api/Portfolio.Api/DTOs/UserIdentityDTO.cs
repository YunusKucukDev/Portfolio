using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Portfolio.Api.DTOs
{
    public class UserIdentityDTO
    {
        public string? Name { get; set; }
        public string? Token { get; set; }
    }
}