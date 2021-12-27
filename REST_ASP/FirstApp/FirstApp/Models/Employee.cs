using System;
using System.ComponentModel.DataAnnotations;

namespace FirstApp.Models
{
    public class Employee
    {
        [Required(ErrorMessage = "Пожалуйста введите название песни")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Введите год выхода песни")]
        public int Age { get; set; }
    }
}
