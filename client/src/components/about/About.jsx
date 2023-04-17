
import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Banner = styled(Box)`
    background-image: url(https://www.wallpapertip.com/wmimgs/23-236943_us-wallpaper-for-website.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px bottom 0px;
    background-size: cover;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
`;

const About = () => {

    return (
        <Box>
            <Banner />
            <Wrapper>
                <Typography variant="h3">BLOG BY SJ</Typography>
                <Text variant="h5">Hello Myself Shreyasa Joshi. I'm studying in RV COLLEGE OF ENGINEERING Computer Science Branch.<br />
                    Check Out My LinkedIn Here
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://www.linkedin.com/in/shreyasa-joshi/" color="inherit" target="_blank"><LinkedInIcon /></Link>
                    </Box>
                </Text>
                <Text variant="h5">
                    Github
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://github.com/iamscj" color="inherit" target="_blank">
                            <GitHub />
                        </Link>
                    </Box>
                    Instagram
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://www.instagram.com/shreyasa_joshi/" color="inherit" target="_blank">
                            <Instagram />
                        </Link>
                    </Box>

                    or send me an Email
                    <Link href="mailto:shreyasajoshi.cs20@rvce.edu.in?Subject=This is a subject" target="_blank" color="inherit">
                        <Email />
                    </Link>.
                </Text>
            </Wrapper>
        </Box>
    )
}

export default About;