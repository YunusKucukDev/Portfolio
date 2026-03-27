// ... diğer usingler
using System.Reflection;
using System.Text;
using AspNetCore.Identity.MongoDbCore.Extensions;
using AspNetCore.Identity.MongoDbCore.Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Bson;
using Portfolio.Api.Data;
using Portfolio.Api.Entities;
using Portfolio.Api.Services.ExperinceService;
using Portfolio.Api.Services.IdentityService;
using Portfolio.Api.Services.ProjectService;
using Portfolio.Api.Services.UserService;
using Portfolio.Api.Settings;

var builder = WebApplication.CreateBuilder(args);

var provider = new Microsoft.AspNetCore.StaticFiles.FileExtensionContentTypeProvider();
provider.Mappings[".glb"] = "model/gltf-binary";
provider.Mappings[".json"] = "application/json";


builder.Services.Configure<DatabaseSettings>(builder.Configuration.GetSection("DatabaseSettings"));
builder.Services.AddSingleton<IDatabaseSettings>(sp =>
    sp.GetRequiredService<IOptions<DatabaseSettings>>().Value);


var databaseSettings = builder.Configuration.GetSection("DatabaseSettings").Get<DatabaseSettings>();


builder.Services.AddSingleton<MongoDB.Driver.IMongoClient>(sp =>
    new MongoDB.Driver.MongoClient(databaseSettings.ConnectionString));


builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());
builder.Services.AddCors();


builder.Services.ConfigureMongoDbIdentity<AppUser, AppRole, Guid>(new MongoDbIdentityConfiguration
{
    MongoDbSettings = new MongoDbSettings
    {
        ConnectionString = databaseSettings.ConnectionString,
        DatabaseName = databaseSettings.DatabaseName
    },
    IdentityOptionsAction = opt =>
    {

        opt.Password.RequiredLength = 6;
        opt.Password.RequireLowercase = false;
        opt.Password.RequireNonAlphanumeric = false;
        opt.Password.RequireUppercase = false;
        opt.Password.RequireDigit = false;
        opt.User.RequireUniqueEmail = true;
    }
});


builder.Services.AddScoped<IExperinceService, ExperinceService>();
builder.Services.AddScoped<IProjectService, ProjectService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<TokenService>();


builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(builder.Configuration["JWTSecurity:SecretKey"]!)),
        ValidateLifetime = true
    };
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseCors(opt =>
{
    opt.AllowAnyHeader()
       .AllowAnyMethod()
       .AllowCredentials()
       .WithOrigins("https://yunuskucukdev.com.tr", "https://www.yunuskucukdev.com.tr"); 
});


app.UseHttpsRedirection();

app.UseDefaultFiles();


app.UseStaticFiles(new StaticFileOptions
{
    ContentTypeProvider = provider
});
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
await SeedDatabase.Initialize(app);

app.MapFallbackToFile("/index.html");

app.Run();