using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Aps6CCReconheciementoFacial.Controllers
{
    public class HomeController : Controller
    {

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Login()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult CadastroImagem()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "About us Page";

            return View();
        }
    }
}