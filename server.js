import express from 'express'
const app = express()
const PORT = 6060

// Serve static files from the current directory
app.use(express.static('app'))

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
