import express from 'express';
import bodyParser from 'body-parser';
import SubCategories from '../../mongo/models/subcategories.js';
const subcategories = express.Router();

subcategories.use(bodyParser.json({ limit: "30mb", extended: true }));
subcategories.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

subcategories.get('/subcategories', async (req, res) => {
    try {
        const getSubCategories = await SubCategories.find({})
        res.status(200).json(getSubCategories)
    }
    catch (err) {
        console.log("Error SubCategories")
        res.status(500).json({ message: "Server Error" });
    }
});

subcategories.post('/createcategories', async (req, res) => {

    let name = req.body.name
    let Id = req.body.Id
    let category = req.body.category

    await SubCategories.findOne({ Id: Id })
        .then(subcategory => {
            if (subcategory) {
                res.send('Category already exist')
            }
            else {
                const newSubCategory = new SubCategories({
                    Id: Id,
                    name: name,
                    category: category
                })
                newSubCategory
                    .save()
                    .then(response => res.send('Category Created'))
                    .catch(err => res.send(err))
            }
        })
})

export default subcategories;