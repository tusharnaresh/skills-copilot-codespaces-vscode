// create web server 

const express = require('express');
const app = express();
const joi = require('joi');

app.use(express.json());

let comments = [
    { id: 1, comment: 'comment 1' },
    { id: 2, comment: 'comment 2' },
    { id: 3, comment: 'comment 3' }
];

app.get('/comments', (req, res) => {
    res.send(comments);
});

app.post('/comments', (req, res) => {
    const schema = joi.object({
        comment: joi.string().required()
    });

    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const comment = {
        id: comments.length + 1,
        comment: req.body.comment
    };
    comments.push(comment);
    res.send(comment);
});

app.put('/comments/:commentId', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.commentId));
    if (!comment) {
        res.status(404).send('The comment with the given ID was not found');
        return;
    }

    const schema = joi.object({
        comment: joi.string().required()
    });

    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    comment.comment = req.body.comment;
    res.send(comment);
});

app.delete('/comments/:commentId', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.commentId));
    if (!comment) {
        res.status(404).send('The comment with the given ID was not found');
        return;
    }

    const index = comments.indexOf(comment);
    comments.splice(index, 1);
    res.send(comment);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});