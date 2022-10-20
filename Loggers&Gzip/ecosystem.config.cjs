module.exports = {
  apps : [{
    name   : "app default",
    script : "src/app.js",
    env:{
      MODE:"FORK",
      PORT:8080,
      DEBUG:false
    }
  },
  {
    name   : "app fork",
    script : "src/app.js",
    env:{
      MODE:"FORK",
      PORT:8081,
      DEBUG:false
    }
  },
  {
    name   : "app cluster",
    script : "src/app.js",
    env:{
      MODE:"CLUSTER",
      PORT:8082,
      DEBUG:false
    },
    exec_mode:'cluster',
    node_args:"--harmony",
    instances:4,
    watch:true
  }]
}