
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const closeMobileMenu = document.getElementById('closeMobileMenu');
const mobileMenu = document.getElementById('mobileMenu');
const mobileOverlay = document.getElementById('mobileOverlay');

function toggleMenu(open) {
  mobileMenu.classList.toggle('active', open);
  mobileOverlay.classList.toggle('active', open);
  document.body.classList.toggle('menu-open', open);
}

mobileMenuBtn.addEventListener('click', () => toggleMenu(true));
closeMobileMenu.addEventListener('click', () => toggleMenu(false));
mobileOverlay.addEventListener('click', () => toggleMenu(false));

document.querySelectorAll('#mobileMenu a').forEach(link => {
  link.addEventListener('click', () => setTimeout(() => toggleMenu(false), 200));
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) toggleMenu(false);
});



// اختيار كل العناصر اللي فيها data-target
const counters = document.querySelectorAll('.stats-counter');

counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText; 
    const increment = target / 200; 
    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(updateCount, 20); 
    } else {
      counter.innerText = target; 
    }
  };

  
  updateCount();
});
// جلب كل عناصر التبويب والمحتوى
const tabs = document.querySelectorAll('.tab-nav-item');
const contents = document.querySelectorAll('.tab-content');


tabs.forEach(tab => {
  tab.addEventListener('click', () => {

    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));


    tab.classList.add('active');
    const target = tab.getAttribute('data-tab');
    const content = document.getElementById(target);
    if(content) content.classList.add('active');
  });
});
// Select all FAQ items
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question'); 
  const answer = item.querySelector('.faq-answer'); 
  const icon = question.querySelector('i'); 

  // Add click event to toggle answer
  question.addEventListener('click', () => {
    const isActive = item.classList.contains('active');

    // Close all FAQ items
    faqItems.forEach(i => {
      i.classList.remove('active');
      i.querySelector('.faq-answer').style.maxHeight = null;
      i.querySelector('.faq-question').style.background = '';
      i.querySelector('.faq-question').style.color = '';
      i.querySelector('i').style.transform = '';
    });

    // If it was not active, open it
    if(!isActive){
      item.classList.add('active');
      answer.style.maxHeight = answer.scrollHeight + "px"; 
      question.style.background = '#1977cc'; 
      question.style.color = '#fff'; 
      icon.style.transform = 'rotate(180deg)'; 
    }
  });
});

// Testimonial slider bullets
const container = document.getElementById('testimonialContainer');
const slides = document.querySelectorAll('.testimonial-slide');

const bulletsContainer = document.createElement('div');
bulletsContainer.className = 'flex justify-center mt-4 gap-2';

slides.forEach((_, index) => {
  const bullet = document.createElement('span');
  bullet.className = 'w-3 h-3 rounded-full bg-gray-400 cursor-pointer';

  bullet.addEventListener('click', () => {
    container.style.transform = `translateX(-${index * 100}%)`;
    // Update bullet colors
    bulletsContainer.querySelectorAll('span').forEach(b => b.classList.replace('bg-blue-600','bg-gray-400'));
    bullet.classList.replace('bg-gray-400','bg-blue-600');
  });

  // Activate the first bullet by default
  if(index === 0) bullet.classList.replace('bg-gray-400','bg-blue-600');
  bulletsContainer.appendChild(bullet);
});

container.parentElement.appendChild(bulletsContainer);
// Lightbox for gallery images
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.style.cssText = `
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.8); display: flex; justify-content: center; align-items: center;
  visibility: hidden; opacity: 0; transition: opacity 0.3s; z-index: 9999;
`;
const img = document.createElement('img');
img.style.maxWidth = '90%';
img.style.maxHeight = '90%';
lightbox.appendChild(img);
document.body.appendChild(lightbox);

// Show image in lightbox on click
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const image = item.querySelector('img');
    img.src = image.src;
    lightbox.style.visibility = 'visible';
    lightbox.style.opacity = '1';
  });
});

// Hide lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
  if(e.target !== img){
    lightbox.style.opacity = '0';
    setTimeout(() => lightbox.style.visibility = 'hidden', 300);
  }
});

