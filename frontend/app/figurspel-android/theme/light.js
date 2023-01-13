// export default
// {
//     colors:{
//       background: 'rgb(242, 242, 242)',
//       border: 'rgb(216, 216, 216)',
//       card: 'rgb(255, 255, 255)',
//       notification: 'rgb(255, 59, 48)',
//       primary: 'rgb(0, 122, 255)',
//       text: 'rgb(28, 28, 30)',
//     },
//     dark: false,
// };

const navTheme = 
{
    colors:{
    //   background: 'rgb(242, 242, 242)',
        background: '#ffffff',
        border: 'rgb(216, 216, 216)',
        card: '#153247',
        notification: 'rgb(255, 59, 48)',
        primary: '#F7D70D',
        text: '#F0F3F4',
        lightText: '#F0F3F4',
        headerText: '#143247'

    },
    dark: false,
};

const mainTheme = {
    colors: {
        primary: '#153247',
        secondary: '#1b3f69',
        background: '#ffffff',
        border: 'rgb(216, 216, 216)',
        card: '#153247',
        notification: 'rgb(255, 59, 48)',
        text: '#F0F3F4',
        lightText: '#F0F3F4',
        headerText: '#143247',
        success: '#198754',
        error: '#dc3545',
    },
    Button: {
        titleStyle: {
            color: navTheme.colors.lightText,
        },
        containerStyle: {
        } 
    },
};


exports.NavigationTheme = navTheme;
exports.MainTheme = mainTheme;
