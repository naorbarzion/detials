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
  event.preventDefault(); // מונע רענון של הדף

  const form = document.getElementById('contactForm');
  const formData = new FormData(form);

  const data = {
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    message: formData.get('message')
  };

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbxgWVxeOUufT871Vw4nX8darB-emfqc3lnTgA8Fk3hDbKlfrJTs4VQCHTTIQIGqHDRnLw/exec', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const result = await response.json();
    if (result.status === "success") {
      alert("הפרטים נשלחו בהצלחה!");
      form.reset();
    } else {
      alert("שגיאה בשליחת הפרטים. נסה שנית.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("שגיאה בשליחת הפרטים. נסה שנית.");
  }
}

