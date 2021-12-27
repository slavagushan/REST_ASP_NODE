using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FirstApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace FirstApp.Controllers
{
    public class EmployeeController : Controller
    {
        public IActionResult Index()
        {
            return View(Repository.AllEmpoyees);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(Employee employee)
        {
            if (ModelState.IsValid)
            {
                Repository.Create(employee);
                return RedirectToAction("Index");
            }
            else
                return View();
        }

        public IActionResult Update(string empname)
        {
            Employee employee = Repository.AllEmpoyees.Where(e => e.Name == empname).FirstOrDefault();
            return View(employee);
        }

        [HttpPost]
        public IActionResult Update(Employee employee, string empname)
        {
            if (ModelState.IsValid)
            {
                Repository.AllEmpoyees.Where(e => e.Name == empname).FirstOrDefault().Age = employee.Age;
                Repository.AllEmpoyees.Where(e => e.Name == empname).FirstOrDefault().Name = employee.Name;

                return RedirectToAction("Index");
            }
            else
                return View();
        }

        [HttpPost]
        public IActionResult Delete(string empname)
        {
            Employee employee = Repository.AllEmpoyees.Where(e => e.Name == empname).FirstOrDefault();
            Repository.Delete(employee);
            return RedirectToAction("Index");
        }
    }
}