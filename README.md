# Mohamed Hussain | Cybersecurity Portfolio

Personal portfolio for **Mohamed Hussain**, a junior penetration tester focused on web application security, network security, vulnerability assessment, and security automation.

**Live portfolio:** [mohamed-hussain-pentester.github.io/Mohamed-Hussain-Portfolio](https://mohamed-hussain-pentester.github.io/Mohamed-Hussain-Portfolio/)

The site is a responsive, static website built with HTML, CSS, and JavaScript and hosted on GitHub Pages.

## Portfolio contents

- **About and capabilities** — background, focus areas, and technical skills.
- **Penetration-testing methodology** — reconnaissance, scanning, enumeration, vulnerability assessment, authorized exploitation, privilege escalation, post-exploitation, and reporting.
- **Security projects** — example work covering a web vulnerability scanner, network reconnaissance tool, OWASP web security lab, and vulnerability assessment dashboard. Project cards indicate whether work is in progress or planned.
- **Labs and write-ups** — practice areas for TryHackMe, PortSwigger Web Security Academy, and Hack The Box, plus a write-up section for lab notes and reports.
- **Certificates and education** — certificate previews and downloads, Computer Science studies, and current learning goals.
- **CV page** — an in-browser PDF viewer with zoom, print, and download controls.
- **Contact page** — a contact form, email copy button, and professional/social links, including LinkedIn, GitHub, Khamsat, Nafezly, and WhatsApp.
- **Submission confirmation** — a thank-you page shown after a successful contact-form submission.

## Technology

- HTML5, CSS3, and vanilla JavaScript
- GitHub Pages for static hosting
- FormSubmit for contact-form delivery
- PDF.js, loaded from cdnjs, to render the CV in the browser
- Google Fonts and Font Awesome for typography and icons

The portfolio content references security tools and technologies including **Burp Suite, Nmap, Metasploit Framework, Wireshark, Netcat, OpenVPN, Kali Linux, Python, Bash, PHP, and JavaScript**.

## Project structure

```text
mohamed-pentesting-portfolio/
├── index.html
├── contact.html
├── thank-you.html
├── cv.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── certificates/
    └── images/
```

## Run locally

No build step or package installation is required. Clone or download the repository, then serve the project directory over HTTP. For example, with Python installed:

```bash
python -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000) in a browser. Serving over HTTP is recommended for the CV's PDF.js module and local PDF assets.

## Contact form

The contact form in `contact.html` submits to FormSubmit and redirects successful submissions to `thank-you.html`. The page then returns visitors to the portfolio.

When deploying a fork or changing the form recipient, update the FormSubmit endpoint and the `_next` URL in `contact.html` to match the destination email and deployed site. FormSubmit may require recipient verification before it delivers messages.

## Certificates and CV

Certificate PDF files and preview images are stored in `assets/certificates/`. The home page links to each certificate for preview and download. The CV PDF is `assets/certificates/MOHAMED_HUSSAIN_CV.pdf`; `cv.html` displays it with PDF.js and also provides direct download and print controls.

To add a certificate:

1. Add its PDF (and, if needed, a preview image) to `assets/certificates/`.
2. Add or update the matching certificate card in `index.html`.
3. Point the preview and download links to the exact asset paths.

## Deploy with GitHub Pages

1. Push the project to a GitHub repository.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Choose the `main` branch and the repository root (`/`), then save.
5. Wait for the Pages deployment and use the URL shown in the Pages settings.

The contact form's `_next` destination is currently configured for this portfolio's GitHub Pages URL. Update it if the site is deployed to a different address.

## Links

- **Portfolio:** [Live site](https://mohamed-hussain-pentester.github.io/Mohamed-Hussain-Portfolio/)
- **Email:** [mohamed.hussain.pentester@gmail.com](mailto:mohamed.hussain.pentester@gmail.com)
- **LinkedIn:** [mohamed-hussain-pentester](https://www.linkedin.com/in/mohamed-hussain-pentester/)
- **GitHub:** [mohamed-hussain-pentester](https://github.com/mohamed-hussain-pentester)
- **Khamsat:** [Mohamed Hussain](https://khamsat.com/user/mohamed_hussain_soc)
- **Nafezly:** [Services](https://nafezly.com/u/mohamed_hussain_soc/services)

## Responsible use

All security testing represented by this portfolio is intended for authorized labs, educational environments, or systems where permission has been granted. Do not test systems without explicit authorization.

---

**Mohamed Hussain** · Junior Penetration Tester | Web Application Security | Vulnerability Assessment
*Learn. Test. Secure.*
