const express = require("express");
const router = express.Router();

const db = require("../../data");
const ret = require("../../lib/return");

router.get("/", function(req, res) {
    db.Loan.findAll().then(function(loans) {
        ret.json(loans, res);
    });
});
// **New Working
router.get("/:BookId/books", function(req, res) {
  db.Loan.all({ where:{BookId:req.params.BookId}}).then(function(loan) {
    if (loan) {
      console.log("success");
      ret.json(loan, res);
    } else {
      console.log("fail");
      res.end();
    }
  });
});

router.get("/:UserId/users", function(req, res){
  db.Loan.all({
    where:{UserId:req.params.UserId}
  }).then(function(loan) {
    if (loan) {
      console.log("success");
      ret.json(loan,res);
    }else {
      console.log("fail");
      res.end();
    }
  });
});

router.get("/:loanID", function(req, res) {
    db.Loan.findByPk(req.params.loanID).then(function(loan) {
        if (loan) {
            ret.json(loan, res);
        } else {
            res.end();
        }
    });
});

router.put("/:loanID", function(req, res) {
    db.Loan.findByPk(req.params.loanID).then(function(loan) {
        if (loan) {
            loan.dueDate = new Date(req.body.dueDate);
            loan.save().then(function(loan) {
                ret.json(loan, res);
            });
        } else {
            res.end();
        }
    });
});

router.delete("/:loanID", function(req, res) {
    db.Loan.findByPk(req.params.loanID)
        .then(function(loan) {
            if (loan) {
                return loan.destroy();
            } else {
                res.end();
            }
        })
        .then(function() {
            res.end();
        });
});

module.exports = router;
