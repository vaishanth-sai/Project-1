document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('contactForm').addEventListener('submit', async (event) => {
  event.preventDefault(); const status = document.getElementById('status');
  const data = Object.fromEntries(new FormData(event.currentTarget).entries());
  status.textContent = 'Sending…';
  try { const response = await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}); const result = await response.json(); if(!response.ok) throw new Error(result.error || 'Request failed'); status.textContent = result.message; event.currentTarget.reset(); }
  catch(error){status.textContent = error.message || 'Could not send message.';}
});
