// src/index.js
import { addNameIfNotExists } from "script.js"

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("nameForm")
  const input = document.getElementById("nameInput")

  form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const name = input.value.trim()

    if (name) {
      await addNameIfNotExists(name, {
        timestamp: Date.now()
      })
      input.value = ""
    }
  })
})
