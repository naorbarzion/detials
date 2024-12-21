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

async function submitForm(event) {
  event.preventDefault();

  const form = document.getElementById('contactForm');
  const formData = new FormData(form);

  const data = {
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    message: formData.get('message'),
  };

  try {
    const response = await fetch(
      'https://script.google.com/macros/s/YOUR_WEB_APP_URL/exec',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    const result = await response.json();
    if (result.status === 'success') {
      alert('הפרטים נשלחו בהצלחה!');
      form.reset();
    } else {
      alert('שגיאה בשליחת הפרטים: ' + result.message);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('שגיאה בשליחת הפרטים. אנא נסה שוב.');
  }
}

document.getElementById('contactForm').addEventListener('submit', submitForm);


