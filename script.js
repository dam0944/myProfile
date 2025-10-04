// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all functionality
  initScrollAnimations()
  initSkillBars()
  initMobileMenu()
  initSmoothScrolling()
  initScrollProgress()
  initHeaderScroll()
  initContactForm()
  initTypingAnimation() // Add typing animation
  setCurrentYear()

  // Add loading animation
  document.body.classList.add("loaded")
})

// Scroll Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")

        // Trigger skill bar animations
        if (entry.target.classList.contains("skill-card")) {
          animateSkillBar(entry.target)
        }
      }
    })
  }, observerOptions)

  // Observe all elements with animation classes
  const animatedElements = document.querySelectorAll(".animate-on-scroll, .project-card, .skill-card")
  animatedElements.forEach((el) => observer.observe(el))
}

// Skill Bar Animations
function initSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress")

  skillBars.forEach((bar) => {
    const progress = bar.getAttribute("data-progress")
    bar.style.width = "0%"
  })
}

// Enhanced Skill Bar Animations
function animateSkillBar(skillCard) {
  const progressBar = skillCard.querySelector(".skill-progress")
  const progress = progressBar.getAttribute("data-progress")

  // Add visible class to skill card
  skillCard.classList.add("visible")

  setTimeout(() => {
    progressBar.style.width = progress + "%"

    // Add a subtle bounce effect when animation completes
    setTimeout(() => {
      progressBar.style.transform = "scaleY(1.1)"
      setTimeout(() => {
        progressBar.style.transform = "scaleY(1)"
      }, 200)
    }, 1500)
  }, 300)
}

// Enhanced skills group animation
function initSkillsGroupAnimation() {
  const skillsGroups = document.querySelectorAll(".skills-group")

  const groupObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
        }
      })
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  skillsGroups.forEach((group) => groupObserver.observe(group))
}

// Mobile Menu
function initMobileMenu() {
  const mobileMenuButton = document.getElementById("mobile-menu-button")
  const mobileMenu = document.getElementById("mobile-menu")

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden")
    })

    // Close menu when clicking on links
    const mobileLinks = mobileMenu.querySelectorAll(".mobile-menu-link")
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden")
      })
    })

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add("hidden")
      }
    })
  }
}

// Smooth Scrolling
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()

      const targetId = link.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight
        const targetPosition = targetSection.offsetTop - headerHeight - 20

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })
}

// Scroll Progress Bar
function initScrollProgress() {
  // Create progress bar element
  const progressBar = document.createElement("div")
  progressBar.className = "scroll-progress"
  document.body.appendChild(progressBar)

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset
    const docHeight = document.body.scrollHeight - window.innerHeight
    const scrollPercent = (scrollTop / docHeight) * 100

    progressBar.style.width = scrollPercent + "%"
  })
}

// Header Scroll Effect
function initHeaderScroll() {
  const header = document.querySelector(".header")
  let lastScrollTop = 0

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset

    // Add scrolled class for styling
    if (scrollTop > 100) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }

    // Hide/show header on scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      header.style.transform = "translateY(-100%)"
    } else {
      header.style.transform = "translateY(0)"
    }

    lastScrollTop = scrollTop
  })
}

// Contact Form
function initContactForm() {
  const form = document.getElementById("contactForm")

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(form)
      const name = formData.get("name") || document.getElementById("name").value
      const email = formData.get("email") || document.getElementById("email").value
      const subject = formData.get("subject") || document.getElementById("subject").value
      const message = formData.get("message") || document.getElementById("message").value

      // Basic validation
      if (!name || !email || !subject || !message) {
        showNotification("Please fill in all fields", "error")
        return
      }

      if (!isValidEmail(email)) {
        showNotification("Please enter a valid email address", "error")
        return
      }

      // Simulate form submission
      showNotification("Thank you! Your message has been sent successfully.", "success")
      form.reset()
    })
  }
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification")
  if (existingNotification) {
    existingNotification.remove()
  }

  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#3b82f6"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `

  notification.querySelector(".notification-content").style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    `

  notification.querySelector(".notification-close").style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `

  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Close functionality
  const closeBtn = notification.querySelector(".notification-close")
  closeBtn.addEventListener("click", () => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => notification.remove(), 300)
  })

  // Auto close after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = "translateX(100%)"
      setTimeout(() => notification.remove(), 300)
    }
  }, 5000)
}

// Set current year in footer
function setCurrentYear() {
  const yearElement = document.getElementById("current-year")
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear()
  }
}

// Parallax effect for hero section
function initParallax() {
  const hero = document.querySelector(".hero")

  if (hero) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const rate = scrolled * -0.5
      hero.style.transform = `translateY(${rate}px)`
    })
  }
}

// Typing animation for hero text
function initTypingAnimation() {
  const typingElement = document.getElementById("typing-text")
  const cursor = document.querySelector(".typing-cursor")

  if (!typingElement) return

  const texts = [
    "Learning Frontend Developer",
    "Learning Backend Development",
    "Building Personal Projects",
    "Passionate Self-Learner",
    "Future Full-Stack Developer",
  ]

  let textIndex = 0
  let charIndex = 0
  let isDeleting = false
  let typingSpeed = 100
  const deletingSpeed = 50
  const pauseTime = 2000

  function typeText() {
    const currentText = texts[textIndex]

    if (isDeleting) {
      // Deleting characters
      typingElement.textContent = currentText.substring(0, charIndex - 1)
      charIndex--
      typingSpeed = deletingSpeed

      if (charIndex === 0) {
        isDeleting = false
        textIndex = (textIndex + 1) % texts.length
        typingSpeed = 100
      }
    } else {
      // Typing characters
      typingElement.textContent = currentText.substring(0, charIndex + 1)
      charIndex++
      typingSpeed = 100 + Math.random() * 50 // Add some variation

      if (charIndex === currentText.length) {
        isDeleting = true
        typingSpeed = pauseTime
      }
    }

    setTimeout(typeText, typingSpeed)
  }

  // Start typing animation after a delay
  setTimeout(() => {
    typeText()
  }, 1500)
}

// Lazy loading for images
function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]")

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Add smooth reveal animations for sections
function initSectionReveals() {
  const sections = document.querySelectorAll("section")

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("section-reveal", "revealed")
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    },
  )

  sections.forEach((section) => {
    section.classList.add("section-reveal")
    sectionObserver.observe(section)
  })
}

// Initialize additional animations on load
window.addEventListener("load", () => {
  initParallax()
  initSectionReveals()
  initLazyLoading()
})

// Add keyboard navigation support
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const mobileMenu = document.getElementById("mobile-menu")
    if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
      mobileMenu.classList.add("hidden")
    }
  }
})

// Smooth scroll to top functionality
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

// Add scroll to top button
function initScrollToTop() {
  const scrollBtn = document.createElement("button")
  scrollBtn.innerHTML = "↑"
  scrollBtn.className = "scroll-to-top"
  scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
    `

  scrollBtn.addEventListener("click", scrollToTop)
  document.body.appendChild(scrollBtn)

  window.addEventListener(
    "scroll",
    throttle(() => {
      if (window.pageYOffset > 300) {
        scrollBtn.style.opacity = "1"
        scrollBtn.style.visibility = "visible"
      } else {
        scrollBtn.style.opacity = "0"
      }
    }, 100),
  )
}

// Initialize scroll to top button
initScrollToTop()

// Initialize skills group animation
document.addEventListener("DOMContentLoaded", () => {
  initSkillsGroupAnimation()
})
