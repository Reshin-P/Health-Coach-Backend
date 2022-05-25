import asyncHandler from "express-async-handler";
import Banner from "../model/BannerModel.js";




// @desc Post  Add Banners
// @route Post /api/banner
// @access Admin

const addBanner = asyncHandler(async (req, res) => {

    const { title, subtitle, titlecolor, subtitlecolor } = req.body
    const { image1, image2, image3 } = req.files
    try {
        const banner = await Banner.findOne()
        if (banner) {
            banner.title = title
            banner.subtitle = subtitle
            banner.image1 = image1
            banner.image2 = image2
            banner.image3 = image3
            banner.titlecolor = titlecolor
            banner.subtitlecolor = subtitlecolor
            banner.save()
            res.status(200).json(banner)
        } else {
            const banner = await Banner.create({
                title,
                subtitle,
                image1,
                image2,
                image3,
                titlecolor,
                subtitlecolor
            })
            res.status(200).json(banner)
        }
    } catch (error) {
        throw new Error("Something went wrong")
    }

})


// @desc GET get Banners
// @route GET /api/banner
// @access Public

const getBanner = asyncHandler(async (req, res) => {
    console.log("banner");

    const banner = await Banner.findOne()
    if (banner) {
        res.status(200).json(banner)
    } else {
        throw new Error("something went wrong")
    }
})

export {
    addBanner,
    getBanner
}