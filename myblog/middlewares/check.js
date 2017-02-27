module.exports = {
  checkLogin (req,res,next) {
    if(!req.session.user) {
      req.flash('error','not login')
      return res.redirect('/signin')
    }
    next()
  },
  checkNotLogin (req,res,next) {
    if(req.session.user){
      req.flash('error','had login')
      return res.redirect('back')
    }
    next()
  }
}
