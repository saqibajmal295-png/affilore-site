document.addEventListener('DOMContentLoaded', () => {
  // 1. Create and inject modal container html
  const modalHTML = `
    <div id="contact-modal" class="contact-modal" aria-modal="true" role="dialog">
      <div class="modal-content">
        <button class="modal-close" id="modal-close-btn" aria-label="Close modal">&times;</button>
        <h3 class="modal-title" id="modal-title">Contact Affilore</h3>
        <p class="modal-desc">Choose how you would like to reach us:</p>
        <div class="modal-options">
          <a href="#" id="modal-gmail-link" target="_blank" rel="noopener noreferrer" class="modal-btn btn-gmail">
            <svg viewBox="0 0 24 24" class="modal-btn-icon"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.573l8.073-6.08c1.618-1.214 3.927-.059 3.927 1.964z" fill="#EA4335"/></svg>
            Open Gmail (Web)
          </a>
          <a href="#" id="modal-mailto-link" class="modal-btn btn-mailto">
            <svg viewBox="0 0 24 24" class="modal-btn-icon"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/></svg>
            Default Mail App
          </a>
          <button id="modal-copy-btn" class="modal-btn btn-copy">
            <svg viewBox="0 0 24 24" class="modal-btn-icon"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" fill="currentColor"/></svg>
            Copy Email Address
          </button>
        </div>
        <div id="modal-toast" class="modal-toast">Email copied to clipboard!</div>
      </div>
    </div>
  `;
  
  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = modalHTML;
  document.body.appendChild(modalContainer.firstElementChild);

  const modal = document.getElementById('contact-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const gmailLink = document.getElementById('modal-gmail-link');
  const mailtoLink = document.getElementById('modal-mailto-link');
  const copyBtn = document.getElementById('modal-copy-btn');
  const toast = document.getElementById('modal-toast');
  const modalTitle = document.getElementById('modal-title');

  const emailAddress = 'affilore4@gmail.com';

  const openModal = (subject, title) => {
    modalTitle.textContent = title;
    
    const encodedSubject = encodeURIComponent(subject);
    gmailLink.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}&su=${encodedSubject}`;
    mailtoLink.href = `mailto:${emailAddress}?subject=${encodedSubject}`;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });

  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(emailAddress).then(() => {
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2000);
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  });

  // Intercept all links containing mailto:
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && link.getAttribute('href') && link.getAttribute('href').startsWith('mailto:')) {
      e.preventDefault();
      
      let subject = 'Contact Us';
      try {
        const urlParams = new URLSearchParams(link.getAttribute('href').split('?')[1]);
        subject = urlParams.get('subject') || 'Contact Us';
      } catch (err) {
        console.error(err);
      }
      
      const isCustomRequest = subject.toLowerCase().includes('custom') || link.classList.contains('nav-btn-request');
      const title = isCustomRequest ? 'Request Custom Tool' : 'Contact Affilore';
      openModal(subject, title);
    }
  });
});
