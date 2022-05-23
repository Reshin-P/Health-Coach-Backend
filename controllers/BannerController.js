import asyncHandler from "express-async-handler";
import Banner from "../model/BannerModel.js";

const addBanner = asyncHandler(async (req, res) => {

    const { title, subtitle, titlecolor, subtitlecolor } = req.body
    const { image1, image2, image3 } = req.files
    try {
        const banner = await Banner.findOne()
        console.log("banner>>", banner);
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
            console.log(">>,,<<<<");
            console.log(title, subtitle, image1, image2, image3);
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

const getBanner = asyncHandler(async (req, res) => {

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