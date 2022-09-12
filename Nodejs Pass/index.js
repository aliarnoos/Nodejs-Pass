import express from 'express'
import { readFile } from 'fs'

const app = express()

const PORT = 5000

app.get("/orders", (req, res) =>{
        readFile("./orders.json", "utf8", (error, data) => {
        if (error) {
          console.log("File read failed:", err)
          return
        }
        const orders = JSON.parse(data)
        let customersTotal = 0;
        getTotal()
        function getTotal () {
          orders.orders.map(order => {
            let orderTotal = order.totalAfterDiscount
            customersTotal += orderTotal
          })          
          console.log({...orders, total:customersTotal})
          res.status(200).send({...orders, total:customersTotal})
        }
      })
})

app.listen(PORT,()=> {
    console.log(`http://localhost:${PORT}/orders`)
})


