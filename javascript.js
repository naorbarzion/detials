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
      'https://script.google.com/macros/s/AKfycbwv2FcJ33HNlOW6vj3_oWnpM1ENAD80qPsOM-zxq8-WckJiokf6scG1MQeymwpzwrp_SQ/exec',
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


