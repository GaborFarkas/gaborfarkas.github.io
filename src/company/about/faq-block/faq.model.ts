/**
 * FAQ section item descriptor.
 */
export interface FaqSectionModel {
    /**
     * The question of the section.
     */
    question: string,
    /**
     * The answer to the question.
     */
    answer: string
}

/**
 * FAQ section group descriptor.
 */
export interface FaqGroupModel {
    /**
     * The prefix for the section groups' questions.
     */
    prefix: string,
    /**
     * The section descriptors.
     */
    sections: FaqSectionModel[]
}
