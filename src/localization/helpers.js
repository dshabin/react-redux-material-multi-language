import resources from './resources'

export const translate = (language, word) => {
    if (!language) {
        language = 'english'
    }
    return resources[language]['translations'][word]
}


export const getLanguageDir = (language) => {
    if (!language) {
        language = 'english'
    }
    return resources[language]['options']['direction']
}
