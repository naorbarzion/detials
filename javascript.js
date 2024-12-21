document.addEventListener("DOMContentLoaded", () => {
    // אנימציית הכותרת
    gsap.from(".hero-title", {
        duration: 1.5,
        y: -50,
        opacity: 0,
        ease: "power2.out"
    });

    // אנימציית גלילה לקטע "אודות"
    gsap.from("#about", {
        scrollTrigger: {
            trigger: "#about",
            start: "top 80%"
        },
        opacity: 0,
        y: 50,
        duration: 1.5
    });

    // אנימציית גלילה לקרוסלת הפרויקטים
    gsap.from(".carousel img", {
        scrollTrigger: {
            trigger: ".carousel",
            start: "top 90%"
        },
        opacity: 0,
        scale: 0.8,
        stagger: 0.2,
        duration: 1
    });
});

// פונקציה לטיפול בטופס צור קשר
async function submitForm(event) {
  event.preventDefault(); // מונע רענון של הדף בעת שליחת הטופס

  // שליפה של הטופס
  const form = document.getElementById('contactForm');
  const formData = new FormData(form);

  // בניית האובייקט לשליחה לשרת
  const data = {
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    message: formData.get('message')
  };

  try {
    // שליחה של הבקשה לשרת
    const response = await fetch(
      'https://script.googleusercontent.com/a/macros/tracer.co.il/echo?user_content_key=rBOqjVZI4yeUUtzrE1AWi9NXVHD53wc6cPzUrtEum88YZ-wF7j2bZRVkXbNgM8qSV19av5yTfhSCnP5vzHXnICPj4JlQB70tOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMi80zadyHLKA_yC38HRlfppGh93112B8g68n4RAo2RJw6xUizjWcYmv5NJ0xE8JYDSi64KcuJd7Pqz_jN20YZNPOA1P1IxxuTQrjzL2cpfxB17A4fHe5wHgR-UInu1z_VJG1EMoXevhnc_ScPTHfLrg&lib=MKBaOYdP44reXiFPbhBqktztJpAeg1GFy',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // הגדרה שגוף הבקשה הוא JSON
        },
        body: JSON.stringify(data) // המרת האובייקט JSON למחרוזת
      }
    );

    // בדיקה אם התגובה מהשרת תקינה
    if (!response.ok) {
      throw new Error(`Network response was not ok. Status: ${response.status}`);
    }

    // המרת התגובה ל-JSON
    const result = await response.json();

    // טיפול בתגובה
    if (result.status === 'success') {
      alert('הפרטים נשלחו בהצלחה! תודה שפנית אלינו.');
      form.reset(); // איפוס הטופס לאחר הצלחה
    } else {
      alert('שגיאה בשליחת הפרטים: ' + result.message);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('שגיאה בשליחת הפרטים. אנא נסה שנית.');
  }
}

// האזנה לאירוע שליחת הטופס
document.getElementById('contactForm').addEventListener('submit', submitForm);


