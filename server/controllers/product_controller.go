package controllers

import (
	"github.com/labstack/echo/v4"
	"net/http"
	"server/models"
)

func GetProducts(c echo.Context) error {
	if len(models.Products) == 0 {
		return echo.NewHTTPError(http.StatusNotFound, "No products found")
	}
	return c.JSON(http.StatusOK, models.Products)
}
