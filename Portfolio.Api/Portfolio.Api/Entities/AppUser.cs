using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AspNetCore.Identity.MongoDbCore.Models;
using Microsoft.AspNetCore.Identity;

namespace Portfolio.Api.Entities
{
    public class AppUser : MongoIdentityUser<Guid>
    {
         public string? Name { get; set; }
    }
}