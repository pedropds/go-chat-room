package router

import "github.com/gin-gonic/gin"

func Authenticate(roles []string) func(c *gin.Context) {
	return func(c *gin.Context) {
		//validate token

	}
}
