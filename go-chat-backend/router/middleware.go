package router

import (
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"net/http"
)

func Authenticate(roles ...string) func(c *gin.Context) {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")

		// Check if the authorization header is missing or doesn't start with "Bearer ".
		if authHeader == "" || len(authHeader) < 7 || authHeader[:7] != "Bearer " {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid or missing Authorization header"})
			c.Abort()
			return
		}

		tokenString := authHeader[7:]

		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			return []byte("secret"), nil //TODO get from config
		})

		if err != nil || !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}

		if len(roles) > 0 {
			jwtValid := checkRoles(token, roles)

			if !jwtValid {
				c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token claims"})
				c.Abort()
				return
			}
		}

		c.Next()
	}
}

func checkRoles(token *jwt.Token, roles []string) bool {
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return false
	}

	// Your token should contain the "roles" claim with an array of roles.
	tokenRoles, ok := claims["roles"].([]interface{})
	if !ok {
		return false
	}

	// Convert token roles to strings.
	tokenRolesStr := make([]string, len(tokenRoles))
	for i, role := range tokenRoles {
		tokenRolesStr[i], ok = role.(string)
		if !ok {
			return false
		}
	}

	// Check if the token contains any of the required roles.
	validRole := false
	for _, role := range roles {
		if containsString(tokenRolesStr, role) {
			validRole = true
			break
		}
	}

	// If no valid role found, return unauthorized.
	if !validRole {
		return false
	}

	return true
}

func containsString(slice []string, s string) bool {
	for _, item := range slice {
		if item == s {
			return true
		}
	}
	return false
}
